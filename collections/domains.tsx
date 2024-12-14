import { buildCollection, buildProperty, EntityReference } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Domain = {
    company: string,
    name: string,
    type: string,
    url: string
};

export const domainsCollection = buildCollection<Domain>({
    name: "Domains",
    singularName: "Domain",
    path: "domains",
    icon: "HiveIcon",
    group: "Directory",
    permissions: ({ authController, user }) => {
        const isAdmin = authController.user?.email?.includes('@blazed.space');
        return ({
            read: isAdmin,
            edit: isAdmin,
            create: isAdmin,
            delete: isAdmin
        });
    },
    subcollections: [
        localeCollection
    ],
    properties: {
        company: {
            name: "Company",
            validation: { required: true },
            dataType: "string"
        },
        name: {
            name: "Name",
            validation: { required: true },
            dataType: "string"
        },
        type: {
            name: "Website Type",
            validation: { required: true },
            dataType: "string"
        },
        url: {
            name: "Domain URL",
            validation: { required: true },
            dataType: "string",
            url: true
        }
    }
})