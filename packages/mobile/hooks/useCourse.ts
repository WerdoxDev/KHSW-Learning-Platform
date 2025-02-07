import { coursesOptions } from "@/utils/queries";
import type { Snowflake } from "@khsw-learning-platform/shared";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useCourse(courseId: Snowflake) {
	const { data } = useQuery(coursesOptions());
	return useMemo(() => data?.find((course) => course.id === courseId), [data, courseId]);
}
