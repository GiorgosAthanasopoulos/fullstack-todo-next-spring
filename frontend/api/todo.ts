import axios, { AxiosResponse } from "axios";
import { T_Todo } from "@/interfaces/todo";

const BASE_URL: string = "http://localhost:8080/";
const API_URL: string = BASE_URL + "api/v1/todo/";

export async function fetch(url: string): Promise<any> {
    const response: AxiosResponse = await axios.get(url);
    return await response.data;
}

export async function getAll(): Promise<T_Todo[]> {
    return await fetch(API_URL + "get");
}

export async function getAllDeleted(): Promise<T_Todo[]> {
    return await fetch(API_URL + "get/deleted");
}

export async function get(id: number): Promise<T_Todo> {
    return await fetch(API_URL + "get/" + id);
}

export async function post(
    title: string,
    description: string,
    deadline: string
): Promise<JSON> {
    const response: AxiosResponse = await axios.post(
        API_URL +
            "post?title=" +
            title +
            "&description=" +
            description +
            "&deadline=" +
            deadline
    );
    return await response.data;
}

// TODO
export async function putTitle(id: number, title: string): Promise<JSON> {
    const response: AxiosResponse = await axios.put(
        API_URL + "put/title/" + id + "?title=" + title
    );
    return await response.data;
}

// TODO
export async function putDescription(
    id: number,
    description: string
): Promise<JSON> {
    const response: AxiosResponse = await axios.put(
        API_URL + "put/description/" + id + "?description=" + description
    );
    return await response.data;
}

export async function putCompleted(
    id: number,
    completed: boolean
): Promise<JSON> {
    const response: AxiosResponse = await axios.put(
        API_URL + "put/completed/" + id + "?completed=" + completed
    );
    return await response.data;
}

export async function putDeadline(id: number, deadline: string): Promise<JSON> {
    const response: AxiosResponse = await axios.put(
        API_URL + "put/deadline/" + id + "?deadline=" + deadline
    );
    return await response.data;
}

export async function undelete(id: number): Promise<JSON> {
    const response: AxiosResponse = await axios.put(
        API_URL + "put/undelete/" + id
    );
    return await response.data;
}

export async function undeleteAll(): Promise<JSON> {
    const response: AxiosResponse = await axios.put(
        API_URL + "put/undelete/all"
    );
    return await response.data;
}

export async function _delete(id: number): Promise<JSON> {
    const response: AxiosResponse = await axios.delete(
        API_URL + "delete/" + id
    );
    return await response.data;
}

export async function deleteAll(): Promise<JSON> {
    const response: AxiosResponse = await axios.delete(API_URL + "delete");
    return await response.data;
}
