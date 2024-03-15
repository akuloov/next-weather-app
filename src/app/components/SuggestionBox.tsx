import React from "react";

export function SuggestionBox({
                           showSuggestions,
                           suggestions,
                           handleSuggestionClick,
                           error
                       }: {
    showSuggestions: boolean,
    suggestions: string[],
    handleSuggestionClick: (item: string) => void,
    error: string
}) {
    return (
        <> {((showSuggestions && suggestions.length > 1) || error) && (
            <ul className="mb-4 bg-white absolute border top-[60px] border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
                {error && suggestions.length < 1 && (<li className="p-1 text-red-500">{error}</li>)}
                {suggestions.map((item, i) => (
                    <li
                        className="p-1 rounded hover:bg-gray-200 cursor-pointer"
                        key={i}
                        onClick={() => handleSuggestionClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        )}
        </>
    )
}