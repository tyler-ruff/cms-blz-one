import { buildCollection, buildProperty, EntityReference } from "firecms";
import { localeCollection } from "./locales.tsx";

export type Project = {
    title: string,
    type: string,
    repo: string,
    uid: number,
    visibility: string,
    client: string,
    status: string,
    docs?: string,
    demo?: string,
    summary: string,
    tags: string[],
    screenshot: string
}

export const projectCollection = buildCollection<Project>({
    name: "Projects",
    singularName: "Project",
    path: "projects",
    icon: "HiveIcon",
    group: "Development",
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
            name: "Title",
            validation: { required: true },
            dataType: "string"
        },
        type: {
            name: "Project Type",
            validation: { required: true },
            dataType: "string",
            enumValues: {
                website: "Website",
                software: "Software",
                media: "Media",
                other: "Other"
            }
        },
        repo: {
            name: "Repo URL",
            validation: { required: true },
            dataType: "string",
            url: true,
        },
        uid: {
            name: "Project ID Number",
            validation: { 
                unique: true, 
            },
            defaultValue: Math.floor(Date.now() / 1000),
            readOnly: true,
            dataType: "number"
        },
        visibility: {
            name: "Visibility",
            dataType: "string",
            enumValues: {
                public: "Public",
                private: "Private",
                unlisted: "Unlisted"
            }
        },
        client: {
            name: "Client",
            dataType: "string",
            validation: { required: true },
            defaultValue: "Blazed Labs",
        },
        status: {
            name: "Current Status",
            dataType: "string",
            enumValues: {
                planning: "Planning",
                development: "Development",
                testing: "Testing",
                staging: "Staging",
                deployment: "Deployment",
                release: "Release",
                stable: "Stable"
            },
            defaultValue: 'planning'
        },
        docs: {
            name: "Documentation URL",
            validation: { required: false },
            dataType: "string",
            url: true,
        },
        demo: {
            name: "Demo URL",
            validation: { required: false },
            dataType: "string",
            url: true,
        },
        summary: {
            name: "Sumnmary",
            validation: { required: true },
            dataType: "string",
            multiline: true,
        },
        tags: {
            name: "Tags",
            description: "Tags to help index the project.",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        screenshot: {
            name: "Screenshot",
            dataType: "string",
            validation: { required: false },
            storage: {
                storagePath: "images",
                acceptedFiles: ["image/projects/*"],
                maxSize: 1024 * 1024,
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                }
            }
        }
    }
})