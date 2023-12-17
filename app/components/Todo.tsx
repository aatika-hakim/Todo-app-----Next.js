"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { FaPlusCircle, FaTrash, FaEdit, FaSave } from "react-icons/fa";

interface Todo {
    id: number;
    text: string;
    originalText?: string;
}

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editingTodoText, setEditingTodoText] = useState<string>("");
    const [originalTodoText, setOriginalTodoText] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };

    const addTodo = () => {
        if (newTodo.trim() !== "") {
            setTodos([...todos, { id: Date.now(), text: newTodo, originalText: newTodo }]);
            setNewTodo("");
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const startEditing = (id: number, text: string) => {
        setEditingTodoId(id);
        setEditingTodoText(text);
        const todoToUpdate = todos.find((todo) => todo.id === id);
        if (todoToUpdate) {
            setOriginalTodoText(todoToUpdate.originalText || text);
        }
    };

    const saveEditing = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === editingTodoId
                    ? { ...todo, text: editingTodoText }
                    : todo
            )
        );
        setEditingTodoId(null);
        setEditingTodoText("");
        setOriginalTodoText("");
    };

    const cancelEditing = () => {
        setEditingTodoId(null);
        setEditingTodoText("");
        setOriginalTodoText("");
    };

    const undoEditing = () => {
        if (editingTodoId !== null) {
            setEditingTodoText(originalTodoText);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTodo();
        }
    };

    return (
        <div className="container pt-4 min-w-full min-h-screen">
            <h1 className="min-w-full text-4xl text-center font-semibold bg-gradient-to-br from-purple-800 to-blue-500 text-white px-4 py-3">
                Todo App
            </h1>
            <div className="flex justify-center space-x-2 mb-10 pt-40">
                <input
                    type="text"
                    placeholder="Add a New Todo"
                    value={newTodo}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="border p-2 w-[30rem]"
                />
                <button
                    onClick={addTodo}
                    className="bg-gradient-to-r from-purple-800 to-blue-500 text-white px-4 py-3 hover:bg-gradient-to-bl"
                >
                    <FaPlusCircle className="w-12 h-8" />
                </button>
            </div>
            <ul className="mx-30">
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className="container mx-auto justify-center flex space-x-2 mb-4 items-center"
                    >
                        {editingTodoId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTodoText}
                                    onChange={(e) =>
                                        setEditingTodoText(e.target.value)
                                    }
                                    className="border p-4 w-96 bg-white"
                                />
                                <button
                                    onClick={saveEditing}
                                    className="bg-gradient-to-r from-green-800 to-green-500 text-white px-3 py-3 hover:bg-gradient-to-bl"
                                >
                                    <FaSave className="w-12 h-8 p-[1px]" />
                                </button>
                                <button
                                    onClick={cancelEditing}
                                    className="bg-gray-800 text-white px-6 py-4 hover:bg-gradient-to-bl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={undoEditing}
                                    className="bg-gray-800 text-white px-6 py-4 hover:bg-gradient-to-bl"
                                >
                                    Undo
                                </button>
                            </>
                        ) : (
                            <>
                                <li className="border p-4 w-96 bg-white">
                                    {todo.text}
                                </li>
                                <button
                                    onClick={() => startEditing(todo.id, todo.text)}
                                    className="bg-gradient-to-r from-purple-800 to-blue-500 text-white px-4 py-3 hover:bg-gradient-to-bl"
                                >
                                    <FaEdit className="w-12 h-8 p-[1px]" />
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="bg-gradient-to-r from-red-800 to-red-500 text-white px-4 py-3 hover:bg-gradient-to-bl"
                                >
                                    <FaTrash className="w-12 h-8 p-[1px]" />
                                </button>
                                {editingTodoId === todo.id && (
                                    <button
                                        onClick={undoEditing}
                                        className="bg-gray-800 text-white px-6 py-4 hover:bg-gradient-to-bl"
                                    >
                                        Undo
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}

