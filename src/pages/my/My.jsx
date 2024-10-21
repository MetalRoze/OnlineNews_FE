import React from "react";
import BasicArticle from "../../components/BasicArticle";
import MenuList from "../../components/MenuList";

export default function My(){
    const articles = Array(4).fill(0);

    return(
        <div className='flex column mobile-header m0 pd0'>
            <MenuList></MenuList>
            <h4>구독</h4>

            <h4>추천 기사</h4>
            {articles.map((_, index) => (
                <BasicArticle key={index} />
            ))}
        </div>
    );
}