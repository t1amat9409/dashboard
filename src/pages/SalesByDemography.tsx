import { Stack, Grid } from "@mui/material";
import { SalesPerformanceGraph } from "./SalesPerformance";
import { BarChart, PieChart, ScatterChart } from "@mui/x-charts";
import { data, series } from "../utils/dataset";

export function SalesByDemography() {
    return (
        <Stack>
            <Grid container spacing={1} sx={{
                mb: 2,
            }}>
                <SalesPerformanceGraph xs={6} title="Sales by Company">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={500}
                        height={300}
                    />
                </SalesPerformanceGraph>
                <SalesPerformanceGraph xs={6} title="Sales by Area">
                    <ScatterChart
                        height={300}
                        series={[
                            {
                                label: 'Series A',
                                data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                            },
                            {
                                label: 'Series B',
                                data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                            },
                        ]}
                    />
                </SalesPerformanceGraph>
            </Grid>
            <Grid container spacing={1}>
                <SalesPerformanceGraph xs={4} title="Sales by Brand">
                    <PieChart
                        series={series}
                        width={400}
                        height={300}
                        slotProps={{
                            legend: { hidden: true },
                        }}
                    />{' '}
                </SalesPerformanceGraph>
                <SalesPerformanceGraph xs={4} title="Sales by Type">
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={300}
                    />
                </SalesPerformanceGraph>
                <SalesPerformanceGraph xs={4} title="Sales by Channel">
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        width={400}
                        height={300}
                    />
                </SalesPerformanceGraph>
            </Grid>
        </Stack>
    );
}