
import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";

export const prettierText = (src) => {
    return prettier.format(src, {
        parser: "babel",
        plugins: [babylon]
    });
}