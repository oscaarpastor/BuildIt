import { Request, Response } from "express";
import { z } from "zod";
import { Project } from "../models/Project";
import { Stat } from "../models/Stat";
import { notFound } from "../middleware/errors";
import { renderSite } from "../lib/render";

const PUBLIC_ID_RE = /^[\w-]{16}$/;

async function findByPublicId(req: Request) {
  const { publicId } = req.params;
  if (typeof publicId !== "string" || !PUBLIC_ID_RE.test(publicId)) throw notFound();
  const project = await Project.findOne({ publicId });
  if (!project) throw notFound();
  return project;
}

// Web generada, accesible por cualquiera que tenga el enlace.
// ?preview=true devuelve la versión reducida (editor y miniaturas), que no
// lleva el script de estadísticas.
export const renderPublicSite = async (req: Request, res: Response) => {
  const project = await findByPublicId(req);
  const mode = req.query.preview === "true" ? "preview" : "public";
  res.type("html").send(await renderSite(project, mode, { trackingId: project.publicId }));
};

const eventSchema = z.object({ type: z.enum(["view", "click"]) });

export const recordEvent = async (req: Request, res: Response) => {
  const { type } = eventSchema.parse(req.body);
  const project = await findByPublicId(req);

  const update =
    type === "view"
      ? { $inc: { views: 1 }, $set: { lastAccess: new Date() } }
      : { $inc: { clicks: 1 } };
  await Stat.updateOne({ project: project._id }, update, { upsert: true });
  res.status(204).send();
};

// Script que la web pública carga para registrar la visita y los clics en enlaces.
const TRACK_JS = `(function () {
  var script = document.currentScript;
  var site = script && script.getAttribute("data-site");
  if (!site) return;
  var url = "/api/public/sites/" + encodeURIComponent(site) + "/events";
  function send(type) {
    try {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: type }),
        keepalive: true
      });
    } catch (e) {}
  }
  send("view");
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target && target.closest && target.closest("a")) send("click");
  }, true);
})();
`;

export const trackScript = (_req: Request, res: Response) => {
  res.type("application/javascript").set("Cache-Control", "public, max-age=3600").send(TRACK_JS);
};
