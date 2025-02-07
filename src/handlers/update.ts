import { Product, Update, User } from "@prisma/client";
import prisma from "../database";
import { Request, Response } from "express";
import { catchAsync } from "../utilities/catchAsync";

export const getOneUpdate = catchAsync(async (req: Request, res: Response) => {
  const update = await prisma.update.findUnique({
    where: { id: req.params.id },
  });
  if (!update) {
    res.status(404).json({ message: "Update not found" });
  } else
    res
      .status(200)
      .json({ success: true, message: "Update found", result: update });
});
export const getUpdates = catchAsync(
  async (req: Request & { user: User }, res: Response) => {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });
    const updates = products.reduce(
      (allUpdates: Update[], product: Product & { updates: Update[] }) => {
        return [...allUpdates, ...product.updates];
      },
      [] as Update[]
    );
    res
      .status(200)
      .json({ success: true, message: "Updates found", result: updates });
  }
);
export const createUpdate = catchAsync(async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: { id: req.body.productId },
  });
  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" });
  } else {
    const update = await prisma.update.create({
      data: {
        ...req.body,
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Update created", result: update });
  }
});
export const updateUpdate = catchAsync(
  async (req: Request & { user: User }, res: Response) => {
    const products = await prisma.product.findMany({
      where: { belongsToId: req.user.id },
      include: { updates: true },
    });
    if (!products?.length) {
      return res
        .status(404)
        .json({ success: false, message: "Producs not found" });
    } else {
      const updates = products.reduce(
        (allUpdates: Update[], product: Product & { updates: Update[] }) => {
          return [...allUpdates, ...product.updates];
        },
        [] as Update[]
      );
      const update = updates.find((u) => u.id === req.params.id);
      if (!update) {
        return res.status(404).json({ message: "Update not found" });
      }

      const result = await prisma.update.update({
        where: { id: req.params.id },
        data: { ...req.body },
      });

      res
        .status(200)
        .json({ success: true, message: "Update updated", result });
    }
  }
);
export const deleteUpdate = catchAsync(
  async (req: Request & { user: User }, res: Response) => {
    const products = await prisma.product.findMany({
      where: { belongsToId: req.user.id },
      include: { updates: true },
    });
    if (!products?.length) {
      return res
        .status(404)
        .json({ success: false, message: "Producs not found" });
    } else {
      const updates = products.reduce(
        (allUpdates: Update[], product: Product & { updates: Update[] }) => {
          return [...allUpdates, ...product.updates];
        },
        [] as Update[]
      );
      const update = updates.find((u) => u.id === req.params.id);
      if (!update) {
        return res.status(404).json({ message: "Update not found" });
      }
      const result = await prisma.update.delete({
        where: { id: req.params.id },
      });
      res
        .status(200)
        .json({ success: true, message: "Update deleted", result });
    }
  }
);
