let posts = [
    "post 1",
    "post 2",
    "post 3",
    "post 7",
    "post 5"
]

function sortPosts(posts) {
    return posts.sort()
}
async function addPost(posts,post) {
    posts.push(post)
    console.log(sortPosts(posts))
}
addPost(posts,"elnur")