import { coursesOptions, myCoursesOptions } from "@/utils/queries";
import type { Snowflake } from "@khsw-learning-platform/shared";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useCourse(courseId: Snowflake) {
	const { data: allCourses } = useQuery(coursesOptions());
	const { data: myCourses } = useQuery(myCoursesOptions());

	return useMemo(() => {
		const course = allCourses?.find((course) => course.id === courseId);
		return { ...course, enrolled: myCourses?.find((x) => x.id === course?.id) !== undefined };
	}, [allCourses, myCourses, courseId]);
}
