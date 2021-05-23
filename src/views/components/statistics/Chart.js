import React, { useEffect, useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import { Bar } from "react-chartjs-2"
import Title from "./Title"
import { getProjects } from "../../../api/api"
import { Typography } from "@material-ui/core"
import LoadingSpinner from "../layout/LoadingSpinner"

function createData(time, amount) {
	return { time, amount }
}

const groupBy = (array, key) => {
	return array.reduce((result, currentValue) => {
		;(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue
		)

		return result
	}, {})
}
const data = [
	createData("01", 0),
	createData("02", 1900),
	createData("03", 600),
	createData("04", 800),
	createData("05", 1500),
	createData("06", 2000),
	createData("07", 2400),
	createData("08", 2400),
	createData("09", 2600),
	createData("10", 2400),
	createData("11", 2400),
	createData("12", undefined),
]

export default function Chart() {
	const theme = useTheme()
	const [data, setData] = useState()
	const [error, setError] = useState(false)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const receivedData = await getProjects()
				const formattedData = groupBy(receivedData, "projectStatus")
				console.log(
					"🚀 ~ file: Chart.js ~ line 42 ~ fetchData ~ formattedData",
					formattedData
				)
				setData(formattedData)
			} catch (err) {
				setError(true)
			}
		}
		fetchData()
	}, [])
	const barChart = (
		<>
			{data ? (
				<Bar
					data={{
						labels: Object.keys(data),
						datasets: [
							{
								label: "",
								backgroundColor: ["rgba(47, 72, 88, 0.6)", "rgba(51, 101, 138, 0.6)", "rgba(134, 187, 216, 0.6)", "rgba(255, 203, 71, 0.6)"],
								data: Object.values(data).map(status => status.length),
							},
						],
					}}
					options={{
						plugins: {
							legend: {
                display: false
							},
						},
					}}
					width={100}
					height={50}
				/>
			) : (
			 <LoadingSpinner/>
			)}
		</>
	)

	if (error) {
		return <Typography>Error from server. Please try again latter</Typography>
	}

	return (
		<React.Fragment>
			<Title>Status of Projects</Title>
			<div>{barChart}</div>
		</React.Fragment>
	)
}
