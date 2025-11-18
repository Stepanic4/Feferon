import { ProductItem, SectionTitle } from "@/components";
import apiClient from "@/lib/api";
import React from "react";
import { sanitize } from "@/lib/sanitize";

// 🔑 ИСПРАВЛЕНИЕ 1: Правильная типизация searchParams.
// searchParams - это объект с ключами, чьи значения могут быть строкой, массивом строк или undefined.
interface Props {
    searchParams: {
        search?: string | string[]; // search - опционален и может быть массивом
        // Добавьте сюда другие возможные параметры, если они есть
    };
}

// 🔑 ИСПРАВЛЕНИЕ 2: Убран лишний 'await'
// Next.js передает searchParams СИНХРОННО.
const SearchPage = async ({ searchParams }: Props) => {
    const sp = searchParams; // searchParams уже является объектом, await не нужен!

    // Дополнительная логика для получения единой строки запроса
    const searchQuery = Array.isArray(sp?.search) ? sp.search[0] : sp?.search || "";

    let products = [];

    try {
        const data = await apiClient.get(
            // Используем очищенную строку запроса
            `/api/search?query=${searchQuery}`
        );

        if (!data.ok) {
            console.error('Failed to fetch search results:', data.statusText);
            products = [];
        } else {
            const result = await data.json();
            products = Array.isArray(result) ? result : [];
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        products = [];
    }

    return (
        <div>
            <SectionTitle title="Search Page" path="Home | Search" />
            <div className="max-w-screen-2xl mx-auto">
                {searchQuery && ( // Используем searchQuery для проверки
                    <h3 className="text-4xl text-center py-10 max-sm:text-3xl">
                        Showing results for {sanitize(searchQuery)}
                    </h3>
                )}
                <div className="grid grid-cols-4 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
                    {products.length > 0 ? (
                        products.map((product: any) => (
                            <ProductItem key={product.id} product={product} color="black" />
                        ))
                    ) : (
                        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
                            No products found for specified query
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;