export interface SearchFormProps
{
  input: SearchQueries,
}

export interface SearchFormState
{

}

export interface SearchQueries extends Array<SearchInput> {  }

export interface SearchInput
{
  label: string,
  type: "checkbox" | "text" | "number" | "range",
}