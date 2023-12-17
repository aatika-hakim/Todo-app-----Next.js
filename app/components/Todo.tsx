"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

interface Todo {
    id: number;
    text: string;
}

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };

    const addTodo = () => {
        if (newTodo.trim() !== "") {
            setTodos([...todos, { id: Date.now(), text: newTodo }]);
            setNewTodo("");
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTodo();
        }
    };
    return (
        <div className="container pt-4 min-w-full min-h-screen bg-black">
            <h1 className="min-w-full text-4xl text-center font-semibold bg-gradient-to-br from-purple-800 to-blue-500 text-white px-4 py-3">
                Todo App
            </h1>
            <div>
                <div className="container mx-auto flex space-x-2 mb-10 pt-40">
                <input
                    type="text"
                    placeholder="Add a New Todo"
                    value={newTodo}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="border p-2 flex-grow"
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
                    <>
                        <div className="container mx-auto flex space-x-2 mb-4 items-center">
                            <li
                                key={todo.id}
                                className="border p-4 flex-grow bg-white"
                            >
                                {todo.text}
                            </li>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="bg-gradient-to-r from-red-800 to-red-500 text-white px-4 py-3 hover:bg-gradient-to-bl"
                            >
                                <FaTrash className="w-12 h-8 p-[1px]" />
                            </button>
                        </div>
                    </>
                ))}
            </ul>
            </div>
        </div>
    );
}
