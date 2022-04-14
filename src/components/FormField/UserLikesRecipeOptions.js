// 因为这个元素在创建 party 和 my likes list 都能用到，
// 所以我把这个数组提取出来了，希望能够保持这个形式
// 注意，因为调用的库的原因，第一个参数必须为“label”，可以执行映射，把recipeName映射成label

const UserLikedRecipeOptions = [
    { label: 'The1', recipeId: 1 },
    { label: 'The2', recipeId: 2 },
    { label: 'The3', recipeId: 3 }
]


export default UserLikedRecipeOptions;