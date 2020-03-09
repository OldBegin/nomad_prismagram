// export const USER_FRAGMENT = `
//     fragment CommentParts on User {
//         id
//         userName
//         email
//         posts{
//             id
//             caption
//             location
//         }
//     }
// `;

export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        id
        text
        user {
            userName
            email
        }
    }
  `;

export const FILE_FRAGMENT = `
    fragment FileParts on File {
        id
        url
        post{
            id
            caption
        }
    }
`;

export const FULL_POST_FRAGMENT =`
    fragment PostParts on Post {
        id
        location
        caption
        files{
            id
            url
        }
        comments{
            id
            text
            user{
                id
                userName
                email
            }
        }
        user{
            id
            userName
            email
        }
        likes{
            user{
                userName
            }
        }
    }
    
  `;