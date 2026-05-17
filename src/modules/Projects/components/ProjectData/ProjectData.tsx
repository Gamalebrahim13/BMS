import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  description: string;
};

type Props = {
  onSubmitForm?: (data: FormValues) => void;
  onCancel?: () => void;
  defaultValues?: Partial<FormValues>;
  mode?: "add" | "edit";
};

export default function SimpleForm({
  onSubmitForm,
  onCancel,
  defaultValues,
  mode = "add",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await onSubmitForm?.(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
   <div className="w-full max-w-4xl rounded-[32px] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100">
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
    
    {/* Header */}
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-gray-800">
        {mode === "edit" ? "Update Project" : "Create Project"}
      </h2>

      <p className="text-sm text-gray-500">
        Fill in the details below
      </p>
    </div>

    {/* Title */}
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
         Title
      </label>

      <input
        type="text"
        placeholder="Name"
        {...register("title", {
          required: "Title is required",
          minLength: {
            value: 2,
            message: "Title must be at least 2 characters",
          },
        })}
        className={`w-full rounded-2xl border bg-gray-50 px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-200 focus:bg-white focus:ring-4 ${
          errors.title
            ? "border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
        }`}
      />

      {errors.title && (
        <p className="text-sm text-red-500">
          {errors.title.message}
        </p>
      )}
    </div>

    {/* Description */}
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Description
      </label>

      <textarea
        rows={5}
        placeholder="Description"
        {...register("description", {
          required: "Description is required",
          minLength: {
            value: 5,
            message: "Description must be at least 5 characters",
          },
        })}
        className={`w-full resize-none rounded-2xl border bg-gray-50 px-5 py-4 text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-200 focus:bg-white focus:ring-4 ${
          errors.description
            ? "border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
        }`}
      />

      {errors.description && (
        <p className="text-sm text-red-500">
          {errors.description.message}
        </p>
      )}
    </div>

    {/* Buttons */}
    <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
      
      <button
        type="button"
        onClick={handleCancel}
        className="rounded-2xl border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02] hover:shadow-orange-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting
          ? "Saving..."
          : mode === "edit"
          ? "Update Project"
          : "Create Project"}
      </button>
    </div>
  </form>
</div>
  );
}
