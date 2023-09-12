import { buildCollection, buildProperty, EntityReference } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Catalog = {
    title: string,
    description: string,
    download: string,
    type: string
}

export const catalogCollection = buildCollection<Catalog>({
    name: "Publications",
    singularName: "Publication",
    path: "catalog",
    icon: "Book",
    group: "Publishing",
    permissions: ({ authController, user }) => ({
        read: true,
        edit: true,
        create: true,
        delete: true
    }),
    subcollections: [
        localeCollection
    ],
    properties: {
        title: {
            name: "Title",
            validation: { required: true },
            dataType: "string"
        },
        description: {
            name: "Description",
            validation: { required: true },
            dataType: "string"
        },
        download: {
            name: "Download Link",
            validation: { required: true },
            dataType: "string"
        },
        type: {
            name: "Type",
            validation: { required: true },
            dataType: "string"
        }
    }
});