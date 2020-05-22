import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('creating a blog with the NewBlogForm succeeds', () => {
    const createBlog = jest.fn()

    const component = render(
        <NewBlogForm createBlog={createBlog}/>
    )
    const input = component.container.querySelector('#title')
    const input2 = component.container.querySelector('#author')
    const input3 = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(input, {
        target: { value: 'Blogi' }
    })
    fireEvent.change(input2, {
        target: { value: 'Bloggari' }
    })
    fireEvent.change(input3, {
        target: { value: 'www.blogi.net' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Blogi')
    expect(createBlog.mock.calls[0][0].author).toBe('Bloggari')
    expect(createBlog.mock.calls[0][0].url).toBe('www.blogi.net')
})