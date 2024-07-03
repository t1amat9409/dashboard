import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { LandingPage } from "../pages/LandingPage";
import { SalesByDemography } from "../pages/SalesByDemography";
import { SalesPerformance } from "../pages/SalesPerformance";

export const Routes = createBrowserRouter([
    {
        path: '/',
        id: 'Root',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/performance',
                element: <SalesPerformance />
            },
            {
                path: '/demography',
                element: <SalesByDemography />
            }
        ]
    }
]);