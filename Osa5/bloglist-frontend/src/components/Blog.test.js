import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


const blog = {
    title: 'blogi',
    author: 'Pekka Bloggari',
    url: 'www.blogi.fi',
    likes: 120,
    user: {
        id: 1234567
    }
}

const loggedUser = {
    id: 1234567
}


test('renders title and author', () => {

    const component = render(
        <Blog blog={blog} user={loggedUser} />
    )

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title}, ${blog.author}`)
    expect(div).not.toHaveTextContent(`${blog.url}`)
})

test('renders full info when view-button is clicked', () => {

    const component = render(
        <Blog blog={blog} user={loggedUser} />
    )

    const div = component.container.querySelector('.blog')
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(div).toHaveTextContent(`Title: ${blog.title}`)
    expect(div).toHaveTextContent(`Author: ${blog.author}`)
    expect(div).toHaveTextContent(`likes: ${blog.likes}`)
    expect(div).toHaveTextContent(`${blog.url}`)
})

test('when like-button is clicked twice, function is called twice', () => {

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={loggedUser} updateBlog={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    const button2 = component.getByText('like')
    fireEvent.click(button2)
    fireEvent.click(button2)

    expect(mockHandler.mock.calls).toHaveLength(2)

})
