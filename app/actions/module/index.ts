"use server";

import { db } from "@/backend/model";
import { createModule } from "@/backend/services/courses";

export const addModule = async (data: FormData) => {
  try {
    const title = data.get("title") as string;
    const slug = data.get("slug") as string;
    const courseId = data.get("courseId") as string;
    const order = parseInt(data.get("order") as string);

    const moduleData = {
      title,
      slug,
      course: courseId,
      order,
    };

    const resModule = await createModule(moduleData);

    if (!resModule) {
      return {
        error: "Module not found",
        code: 404,
      };
    }

    // find course and add module to it
    const course = await db.course.findById(courseId);

    if (!course) {
      return {
        error: "Course not found",
        code: 404,
      };
    }

    course.modules.push(resModule._id);
    await course.save();

    return {
      module: resModule,
      code: 201,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
};

export const reOrderModules = async (
  updateData: { id: string; position: number }[]
) => {
  try {
    const promises = updateData.map(async ({ id, position }) => {
      const resModule = await db.module.findById(id);

      if (!resModule) {
        return {
          error: "Module not found",
          code: 404,
        };
      }

      resModule.order = position;
      await resModule.save();
    });

    await Promise.all(promises);

    return {
      code: 200,
      message: "Modules reordered",
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
};

export const updateModule = async (moduleId: string, data: FormData) => {
  try {
    const res = await db.module.findByIdAndUpdate(moduleId, data, {
      new: true,
    });

    if (!res) {
      return {
        error: "Module not found",
        code: 404,
      };
    }

    return {
      message: "Module updated",
      code: 200,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
};


export const changeModulePublishState = async (moduleId: string) => {
  try {
    const resModule = await db.module.findById(moduleId);

    if (!resModule) {
      return {
        error: "Module not found",
        code: 404,
      };
    }

    resModule.active = !resModule.active;
    await resModule.save();

    return {
      activeState: resModule.active,
      code: 200,
    };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }
}

export const deleteModule = async (moduleId: string) => {
  try {
    await db.module.findByIdAndDelete(moduleId);

    return {
      message: "Module deleted",
      code: 200,
    };
    
  } catch (err) {
    console.log(err);
    
    return {
      error: err instanceof Error ? err.message : "Something went wrong",
      code: 500,
    };
  }  
};
