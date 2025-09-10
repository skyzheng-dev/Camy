import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/constants/theme'
import { styles } from '@/styles/notifications.styles'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { formatDistanceToNow } from 'date-fns'
import { Id } from "@/convex/_generated/dataModel"; // adjust path as needed

// type NotificationProp = {
//   notification: {
//     _id: Id<"notifications">;
//     _creationTime: number;
//     type: "like" | "follow" | "comment";
//     comment?: string;
//     sender: {
//       _id: Id<"users">;
//       username: string;
//       image: string;
//     };
//     post?: {
//       _id: Id<"posts">;
//       imageUrl: string;
//     };
//   };
// };

// type NotificationType = "like" | "follow" | "comment";

// type NotificationProp = {
//     notification: {
//         _id: string;
//         _creationTime: number;
//         type: NotificationType;
//         comment?: string;
//         sender: {
//             _id: string;
//             username: string;
//             image: string;
//         };
//         post?: {
//             imageUrl: string;
//         };
//     }
//   };


// type NotificationProp = {
//   notification: {
//     _id: Id<"notifications">;
//     _creationTime: number;
//     type: "like" | "follow" | "comment";
//     sender: {
//       _id: Id<"users">;
//       username: string;
//       image: string;
//     };
//     post?: {
//       _id: Id<"posts">;
//       imageUrl: string;
//       caption?: string;
//       likes?: number;
//       comments?: number;
//       _creationTime?: number;
//       isLiked?: boolean;
//       isBookmarked?: boolean;
//     };
//     comment?: string;
//   };
// };


export default function Notification({notification}: any){ //NotificationProp instead of any
    return (
      <View style={styles.notificationItem}>
        <View style={styles.notificationContent}>
          <Link href={`/user/${notification.sender._id}`} asChild>
            <TouchableOpacity style={styles.avatarContainer}>
              <Image
                source={notification.sender.image}
                style={styles.avatar}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.iconBadge}>
                {notification.type === "like" ? (
                  <Ionicons name="heart" size={14} color={COLORS.primary}/>
                ): notification.type === "follow" ? (
                  <Ionicons name="person-add" size={14} color={"#8B5CF6"}/>
                ) : (
                  <Ionicons name="chatbubble" size={14} color={"#3B82F6"}/>
                )}
              </View>
            </TouchableOpacity>
          </Link>
  
          <View style={styles.notificationInfo}>
            <Link href={`/user/${notification.sender._id}`} asChild>
              <TouchableOpacity>
                <Text style={styles.username}>{notification.sender.username}</Text>
              </TouchableOpacity>
            </Link>
  
            <Text style={styles.action}>
              {notification.type === "follow"
                ? "started following you"
                : notification.type === "like"
                ? "liked your post"
                : `commented: "${notification.comment}"`
              }
            </Text>
            <Text style={styles.timeAgo}>
              {formatDistanceToNow(notification._creationTime, {addSuffix:true})}
            </Text>
          </View>
        </View>
        {notification.post && (
          <Image
            source={notification.post.imageUrl}
            style={styles.postImage}
            contentFit='cover'
            transition={200}
           />
        )}
      </View>
    )
  }