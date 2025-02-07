import { Request, Response } from "express";
import prisma from "../database";
import { User } from "@prisma/client";
import { catchAsync } from "../utilities/catchAsync";

export const getProducts = catchAsync(
  async (req: Request & { user: User }, res: Response): Promise<void> => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        products: true,
      },
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "Something went wrong!",
      });
    }
    res.status(200).json({
      success: true,
      result: user?.products,
    });
  }
);

export const getOneProduct = catchAsync(
  async (req: Request & { user: User }, res: Response) => {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      result: product,
    });
  }
);

export const createProduct = catchAsync(
  async (req: Request & { user: User }, res: Response) => {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        belongsToId: req.user.id,
      },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      result: product,
    });
  }
);

export const updateProduct = catchAsync(
  async (req: Request & { user: User }, res: Response) => {
    const updatedProduct = await prisma.product.update({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
      data: {
        ...req.body,
      },
    });
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      result: updatedProduct,
    });
  }
);

export const deleteProduct = catchAsync(
  async (req: Request & { user: User }, res: Response) => {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    });
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      result: deletedProduct,
    });
  }
);
