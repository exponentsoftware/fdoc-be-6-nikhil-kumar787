import asyncHandler from "express-async-handler";
import Like from "../model/likeModel";
import Rating from "../model/ratingModel";
import View from "../model/viewModel";
import ErrorHandler from "../utils/errorHandler";

const addLikes = asyncHandler(async (req, res, next) => {
  const { userId, todoId } = req.body;

  const todo_like = await Like.findOne({ todoId: todoId });
  if (!todo_like) {
    const like = new Like({
      userId,
      todoId,
    });
    const liked = await like.save();

    if (liked) {
      return res.status(201).json({
        message: "like added successfully",
      });
    } else {
      return next(new ErrorHandler("Something went wrong", 400));
    }
  } else {
    const like = await Like.findOne({ userId: userId });

    if (!like) {
      const existingTodoliked = await Like.findOneAndUpdate(
        { todoId: todo_like.todoId },
        { $push: { userId: userId } }
      );
      console.log(existingTodoliked);
    } else {
      return res.status(201).json({
        message: "already liked by the user",
      });
    }
  }
});

const addRating = asyncHandler(async (req, res, next) => {
  const { userId, todoId, rate } = req.body;

  const todo_rating = await Rating.findOne({ todoId: todoId });
  if (!todo_rating) {
    const rating = new Rating({
      userId,
      todoId,
      rating: rate,
    });
    const rated = await rating.save();

    if (rated) {
      return res.status(201).json({
        message: "Rating added successfully",
      });
    } else {
      return next(new ErrorHandler("Something went wrong", 400));
    }
  } else {
    const rating = await Rating.findOne({ userId: userId });

    if (!rating) {
      const existingRating = await Rating.findOneAndUpdate(
        { todoId: todo_rating.todoId },
        { $push: { userId: userId } },
        { $inc: { rating: rate } },
        { new: true, upsert: true, useFindAndModify: false }
      );
      console.log(existingRating);
    } else {
      return res.status(201).json({
        message: "already Rated_by by the user",
      });
    }
  }
});

const addViews = asyncHandler(async (req, res, next) => {
  const { userId, todoId } = req.body;

  const todo_view = await View.findOne({ todoId: todoId });

  if (!todo_view) {
    const view = new View({
      userId,
      todoId,
    });
    const viewed = await view.save();

    if (viewed) {
      return res.status(201).json({
        message: "viewed_by added successfully",
      });
    } else {
      return next(new ErrorHandler("Something went wrong", 400));
    }
  } else {
    const view = await View.findOne({ userId: userId });

    if (!view) {
      const existingViewed = await Like.findOneAndUpdate(
        { todoId: todo_view.todoId },
        { $push: { userId: userId } }
      );
      return res.status(201).json({
        message: "View added successfully",
      });
    } else {
      return res.status(201).json({
        message: "already viewed by the user",
      });
    }
  }
});

export { addLikes, addRating, addViews };
