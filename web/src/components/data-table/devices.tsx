"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Device = {
	id: string
	name: string
	status: "Active" | "Inactive",
	location: string,
	time_active: string,
}

export const columns: ColumnDef<Device>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			if (status === "Active") {
				return <span className="text-green-500 font-semibold">Active</span>
			}
			if (status === "Inactive") {
				return <span className="text-red-500 font-semibold">Inactive</span>
			}
		}
	},
	{
		accessorKey: "location",
		header: "Location",
	},
	{
		accessorKey: "time_active",
		header: "Time Active",
	},
]
