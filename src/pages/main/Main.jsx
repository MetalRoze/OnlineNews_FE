import React from "react";
import MenuList from "../../components/MenuList";
import HeadlineArticle from "../../components/HeadlineArticle";

export default function Main() {
    return(
        <div className='flex column mobile-header m0 pd0'>
            <MenuList/>
            <HeadlineArticle></HeadlineArticle>
        </div>
    );
}