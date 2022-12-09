import React, { useEffect } from "react";
import {useRouter} from 'next/router'
import { useMutation, useQuery } from "../../../lib/graphql";
import { useFormik } from 'formik'
import Layout from "../../../components/layout";
import Title from "../../../components/title";

import Button from '../../../components/Button'


    const GET_ALL_CATEGORIES = `
    query {
        getAllCategories{
          id
          name
          slug
        }
      }
    `
    const UPDATE_PRODUCTS = `
    mutation updateProducts($id: String!, $name: String!, $slug: String!, $description: String!, $category: String!) {
        updateProduct (input:{
            id: $id,
            name: $name,
            slug: $slug,
            description: $description,
            category: $category
        }) {
          id
          name
          slug
          description
          category
        }
      }
    `

const Edit = () => {
    
    //defined data that comes from the server
    const router = useRouter()
    const {data} = useQuery(`
    query{
        getProductById(id:"${router.query.id}"){
            name
            slug
            category
            description
        }
    }
    
    `)
    const [updatedData, updateProducts] = useMutation(UPDATE_PRODUCTS)
    const {data:category, mutate} = useQuery(GET_ALL_CATEGORIES)
    //set form data
    const form = useFormik({
        initialValues:{
            name:'',
            slug:'',
            description:'',
            category:'',
        },
        //use async to wait product be created and later redirect  
        onSubmit: async values => {
            const product = {
                ...values,
                id: router.query.id
            }
          await  updateProducts(product)
            router.push('/products')
        }
    })
    //passed data to the form
    useEffect(() => {
        if(data && data.getProductById){
            form.setFieldValue('name', data.getProductById.name)
            form.setFieldValue('slug', data.getProductById.slug)
            form.setFieldValue('description', data.getProductById.description)
            form.setFieldValue('category', data.getProductById.category)
        }
    },[data])
    // 
    return(
        <>
          <Layout>
            <Title>Editar Produto</Title>
                        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
             
                       
        
                      
                        
        
                        <div className="flex flex-col mt-8">
                            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                <div
                                    className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
         <div>
          
          {/* {JSON.stringify(data)} */}
        
            
            </div>
           </div>
         </div>
         </div>

         <form onSubmit={form.handleSubmit}>
         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div className="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="">
      Produto
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' name='name'onChange={form.handleChange} value={form.values.name} />
    </div>

    <div class="mb-6">
      <label className="block text-grey-darker text-sm font-bold mb-2" for="">
       Slug do produto
      </label>
      <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" type='text' name='slug' onChange={form.handleChange} value={form.values.slug}/>
      </div>
      <div class="mb-6">
      <label className="block text-grey-darker text-sm font-bold mb-2" for="">
       Descrição do produto
      </label>
      <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" type='text' name='description' onChange={form.handleChange} value={form.values.description}/>
      </div>

      <div className="mb-6">   
                           <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
                                Selecione a categoria
                            </label>
                           <select name='category' onChange={form.handleChange} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" >
                                {category && category.getAllCategories && category.getAllCategories.map(item => { return (<option value={item.id} key={item.id}>{item.name}</option>)})}
                            </select>
                            </div>

    <div className="flex items-center justify-between">
    <Button className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-500 rounded shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none" type='submit'>Atualizar Produto</Button>
    
    </div>
</div> 
</form>
<Button.Back className="text-indigo-600 hover:text-indigo-900" href='/categories'>voltar</Button.Back>
         
         </Layout>
         

        </>
    ) 
}

export default Edit