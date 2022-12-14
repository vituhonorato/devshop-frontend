import React from 'react'
import Link from 'next/link'
import Layout from '../../components/layout'
import Table from '../../components/Table'
import Title from '../../components/title'


import { useMutation, useQuery } from '../../lib/graphql'
import Button from '../../components/Button'
import Alert from '../../components/Alert'



//interface
const DELETE_CATEGORY = `
mutation deleteCategory($id: String!) {
    deleteCategory (id: $id)
     
      
  }
`

const GET_ALL_CATEGORIES = `
    query {
        getAllCategories{
          id
          name
          slug
        }
      }
    `


const Index = () => {
    const {data, mutate} = useQuery(GET_ALL_CATEGORIES)
    const [deleteData, deleteCategory] = useMutation(DELETE_CATEGORY)
    const remove = id => async() => {
        await deleteCategory({ id })
        mutate()
    }

    return(
        <div >
            
        <Layout>
        <Title>Gerenciar Categorias</Title>
                        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
             
                       
        
                        <div className="mt-8">
                        
                        </div>
                        <Button.Link className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none" href='/categories/create'>Criar Categorias</Button.Link>
        
                        <div className="flex flex-col mt-8">
                            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">

                            {data && data.getAllCategories && data.getAllCategories.length === 0 && (
                            <Alert>
                                <span class="font-medium">Atenção!</span> Nenhuma categoria listada!
                            </Alert>)}
                          
                            {data && data.getAllCategories && data.getAllCategories.length > 0 && (
                                <div
                                    className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                                         
                                        <Table>
                                            <Table.Head>
                                                <Table.Th>Categorias</Table.Th>
                                                <Table.Th></Table.Th>
                                                <Table.Th></Table.Th>
                                           
                                            </Table.Head>
                                             <Table.Body>
                                                {data && data.getAllCategories && data.getAllCategories.map(item => {
                                                    return (
                                                    <Table.Tr key={item.id}>
                                                    <Table.Td >
                                                          <div className="flex items-center">
                                                             
              
                                                              <div >
                                                                  <div className="text-sm leading-5 font-medium text-gray-900">{item.name}
                                                                  </div>
                                                                  <div className="text-sm leading-5 text-gray-500">{item.slug}</div>
                                                              </div>
                                                          </div>
                                                      </Table.Td>
              
                                                     
              
                                                      <Table.Td>
                                                        <Button.Link className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-indigo-500 rounded shadow ripple hover:shadow-lg hover:bg-indigo-600 focus:outline-none" href={`/categories/${item.id}/edit`} >
                                                         <p >Editar</p> 
                                                          </Button.Link>
                                                      </Table.Td>

                                                      <Table.Td>
                                                          <Button.Remove onClick={remove(item.id)} >Deletar</Button.Remove>
                                                      </Table.Td>
                                                   </Table.Tr>

                                                )})}
                                              
                                          
                                        </Table.Body>
        
                                       
                                     </Table>
                                   
                                </div>
                                )}
                            </div>
                        </div>
        </Layout>
        </div>
    )
}

export default Index