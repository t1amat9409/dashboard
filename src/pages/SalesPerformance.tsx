import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { BarChart, BarPlot, ChartsAxisHighlight, ChartsLegend, ChartsTooltip, ChartsXAxis, ChartsYAxis, LinePlot, ResponsiveChartContainer } from "@mui/x-charts";
import React from "react";
import { Treemap, ResponsiveContainer } from 'recharts';
import { monthLabels, pData, treeMapData, uData } from "../utils/dataset";

export function SalesPerformance() {
    return (
        <Stack>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <SalesPerformanceHeaderItem trend="up" title="Revenue Sales (Rp)" tValue="1.05 M" background="lightblue" />
                </Grid>
                <Grid item xs={3}>
                    <SalesPerformanceHeaderItem trend="up" title="YYD Revenue Sales (Rp)" tValue="1.55 M" background="teal" />
                </Grid>
                <Grid item xs={3}>
                    <SalesPerformanceHeaderItem trend="up" title="Quantity Sales (Unit)" tValue="500" />
                </Grid>
                <Grid item xs={3}>
                    <SalesPerformanceHeaderItem trend="down" title="YYD Quantity Sales (Unit)" tValue="1.500" background="purple" />
                </Grid>
            </Grid>
            <Grid container spacing={1} sx={{
                my: 2,
            }}>
                <SalesPerformanceGraph xs={6} title="Trend Sales">
                    <ResponsiveChartContainer
                        height={140}
                        series={[
                            {
                                type: 'bar',
                                data: pData,
                                label: 'Revenue'
                            },
                            {
                                type: 'line',
                                data: uData,
                                label: 'Quality'
                            },
                        ]}
                        xAxis={[
                            {
                                data: monthLabels,
                                scaleType: 'band',
                                id: 'x-axis-id',
                            },
                        ]}
                    >
                        <BarPlot />
                        <LinePlot />
                        <ChartsXAxis label="" position="bottom" axisId="x-axis-id" />
                        <ChartsYAxis />
                        <ChartsLegend direction="row" />
                        <ChartsAxisHighlight />
                        <ChartsTooltip />
                    </ResponsiveChartContainer>
                </SalesPerformanceGraph>
                <SalesPerformanceGraph xs={6} title="Sales Comparison">
                    <ResponsiveChartContainer
                        height={140}
                        series={[
                            {
                                type: 'line',
                                data: pData,
                                label: 'This Year'
                            },
                            {
                                type: 'line',
                                data: uData,
                                label: 'Last Year'
                            },
                        ]}
                        xAxis={[
                            {
                                data: monthLabels,
                                scaleType: 'band',
                                id: 'x-axis-id',
                            },
                        ]}
                    >
                        <BarPlot />
                        <LinePlot />
                        <ChartsXAxis label="" position="bottom" axisId="x-axis-id" />
                        <ChartsYAxis />
                        <ChartsLegend direction="row" />
                        <ChartsAxisHighlight />
                        <ChartsTooltip />
                    </ResponsiveChartContainer>
                </SalesPerformanceGraph>
            </Grid>

            <Grid container spacing={1} sx={{
                my: 2,
            }}>
                <SalesPerformanceGraph xs={4} title="Top 5 Channel">
                    <ResponsiveContainer width="100%" height="300px">
                        <Treemap width={400} height={200} data={treeMapData} dataKey="size" aspectRatio={4 / 3} stroke="#fff" fill="#8884d8" />
                    </ResponsiveContainer>
                </SalesPerformanceGraph>
                <SalesPerformanceGraph xs={4} title="Top 5 Brand">
                    <BarChart
                        height={300}
                        layout="horizontal"
                        series={[
                            { data: uData, stack: 'total', type: 'bar', },
                        ]}
                        yAxis={[
                            {
                                data: monthLabels,
                                scaleType: 'band',
                                id: 'y-axis-id',
                            }
                        ]}
                    />
                </SalesPerformanceGraph>
                <SalesPerformanceGraph xs={4} title="Top 5 Customer">
                    <BarChart
                        height={300}
                        layout="horizontal"
                        series={[
                            { data: uData, stack: 'total' },
                        ]}
                        yAxis={[
                            {
                                data: monthLabels,
                                scaleType: 'band',
                                id: 'y-axis-id',
                            }
                        ]}
                    />
                </SalesPerformanceGraph>
            </Grid>
        </Stack>
    );
}

interface SalesPerformanceGraphProps {
    title: string;
    xs: number;
    children?: React.ReactNode;
}

export function SalesPerformanceGraph({ title, xs, children }: SalesPerformanceGraphProps) {
    return (
        <Grid item xs={xs}>
            <Paper sx={{
                minHeight: '150px',
                py: 1,
                px: 2,
            }}>
                <Typography sx={{
                    fontSize: '20px',
                }}>{title}</Typography>
                <Box sx={{
                    mt: 1,
                }}>{children}</Box>
            </Paper>
        </Grid>
    )
}

interface SalesPerformanceHeaderItemProps {
    background?: string;
    title: string;
    tValue: string;
    trend: 'up' | 'down',
}
function SalesPerformanceHeaderItem({
    background = 'crimson',
    title,
    tValue,
    trend,
}: SalesPerformanceHeaderItemProps) {
    const renderSalesPerformanceHeaderItemLabel = (key: string, value: string, textAlign: 'left' | 'center' | 'right', trend?: 'up' | 'down') => {
        return (
            <Box>
                <Typography sx={{
                    fontSize: '12px',
                    color: 'gray',
                    textAlign,
                }}>{key}</Typography>
                {trend ? (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>{trend === 'up' ? (
                        <ArrowUpward sx={{
                            color: 'limegreen'
                        }} />
                    ) : (
                        <ArrowDownward sx={{
                            color: 'red',
                        }} />
                    )}</Box>
                ) : (
                    <Typography sx={{
                        fontSize: '18px',
                        color: '#000',
                        fontWeight: 'bold',
                        textAlign,
                    }}>{value}</Typography>
                )}
            </Box>
        )
    }
    return (
        <Paper sx={{
            width: '100%',
        }}>
            <Paper sx={{
                background,
                opacity: 0.8,
                py: 1,
                px: 2,
                color: '#fff'
            }}>
                <Typography>{title}</Typography>
                <Typography sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '24px'
                }}>{tValue}</Typography>
            </Paper>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'calc(100% / 3) calc(100% / 3) calc(100% / 3)',
                py: 1,
                px: 2,
            }}>
                {renderSalesPerformanceHeaderItemLabel('Last Year', '900 M', 'left')}
                {renderSalesPerformanceHeaderItemLabel('% Change', '20 %', 'center')}
                {renderSalesPerformanceHeaderItemLabel('Trend', '', 'center', trend)}
            </Box>
        </Paper>
    )
}