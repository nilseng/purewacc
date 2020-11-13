import { IProject } from "../models/Project"

export const getProjects = async (token: any) => {
    const res = await fetch("/project/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res.json()
}

export const createProject = async (token: any, project: IProject) => {
    const res = await fetch("/project", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
    return res.json()
}