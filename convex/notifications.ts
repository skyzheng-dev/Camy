import { query } from "./_generated/server"
import { getAuthenticatedUser } from "./users"



export const getNotifications = query({
    handler: async (ctx) => {
        const currentUser = await getAuthenticatedUser(ctx)

        const notifications = await ctx.db.query("notifications")
        .withIndex("by_receiver", (q) => q.eq("receiverId", currentUser._id))
        .order("desc")
        .collect()

        const notificationsWithInfo = await Promise.all(
            notifications.map(async (notification) => {
                const sender = await ctx.db.get(notification.senderId) //originally with a paranthesis and an exclamation mark at the end
                let post = null
                let comment = null

                if (notification.postId) {
                    post = await ctx.db.get(notification.postId)
                }
                if (notification.type === "comment" && notification.commentId) {
                    comment = await ctx.db.get(notification.commentId)
                }

                return {
                    ...notification,
                    sender: {
                        _id: sender?._id, //originally without question mark
                        username: sender?.username, //originally without question mark
                        image: sender?.image, //originally without question mark
                    },
                    post,
                    comment:comment?.content
                }
            })
        )
        return notificationsWithInfo
    }
})