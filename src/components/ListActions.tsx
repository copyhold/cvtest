import React, {useContext} from 'react';
import styled from 'styled-components';
import {ProductsContext} from "../context.tsx";

const StyledContainer = styled.header`
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0px;
    padding-block: .5rem;
    background: #fff;
`
const filterFields = ['createdAt' , 'id' , 'name']
export type TFilterFields = {
  search: string;
  order: typeof filterFields[number]
}
export const ListActions: React.FC<{filter: TFilterFields, onChange: (filter: TFilterFields) => void}> = ({filter, onChange}) => {
  const {setSelectedProduct} = useContext(ProductsContext);
  const handleAddProduct = () => {
    setSelectedProduct({
      name: '',
      createdAt: new Date(),
      price: 0,
    });
  }
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {value}} = e;
    onChange({...filter, search: value});
  }
  const handleChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {target: {value}} = e;
    onChange({...filter, order: value});
  }
  return (
    <StyledContainer>
      <button onClick={handleAddProduct}>add</button>
      <select onChange={handleChangeOrder}>
        {filterFields.map(field => <option value={field} selected={field === filter.order}>{`by ${field}`}</option>)}
      </select>
      <input onInput={handleSearchProduct} placeholder={'search'}/>
    </StyledContainer>
  )
}
