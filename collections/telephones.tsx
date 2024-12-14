import { buildCollection, buildProperty, EntityReference } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Telephone = {
    type: string,
    number: string,
    company: string
};

export const telephonesCollection = buildCollection<Telephone>({
    name: "Telphones",
    singularName: "Telephone",
    path: "telephones",
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
        type: {
            name: "Phone Number Type",
            validation: { required: true },
            dataType: "string"
        },
        number: {
            name: "Phone Number",
            validation: { 
                required: true,
                matches: "^\+(\d{11})$" 
            },
            dataType: "string"
        },
        company: {
            name: "Company",
            validation: { required: true },
            dataType: "string"
        }
    }
})