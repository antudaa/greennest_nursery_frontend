import debounce from "lodash.debounce";
import { useEffect, useState } from "react"


const DebounceSearch = (value: string, delay: number) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = debounce(() => {
            setDebounceValue(value);
        }, delay);

        handler();

        return () => {
            handler.cancel();
        };
    }, [value, delay]);

    return debounceValue;
};

export default DebounceSearch;