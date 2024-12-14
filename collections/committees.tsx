import { buildCollection, buildProperty, EntityReference } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Committee = {
    title: string,
    url: string
}

export const committeesCollection = buildCollection<Committee>({
    name: "Committees",
    singularName: "Committee",
    path: "committees",
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
        title: {
            name: "Committee Name",
            validation: { required: true },
            dataType: "string"
        },
        url: {
            name: "Committee URL",
            validation: { required: true },
            dataType: "string",
            url: true
        }
    }
})