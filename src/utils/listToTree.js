function listToTree(list) {
  let info = list.reduce((map, node) => ((map[node.id] = node), (node.replies = []), map), {})
  return list.filter((node) => {
    info[node.commentId] && info[node.commentId].replies.push(node)
    return !node.commentId
  })
}

export default listToTree
