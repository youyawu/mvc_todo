type todo = {
    id?: number,
    text?: string,
    complete?: boolean
}
type todo_handle = (x: todo) => void