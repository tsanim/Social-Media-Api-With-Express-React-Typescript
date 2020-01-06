import SearchData from "../../SearchData.interface";

export default interface SearchFormProps {
    searchHandler: (data: SearchData) => void;
}
