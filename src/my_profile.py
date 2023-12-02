class MyProfile:
    def __init__(
        self,
        name,
        user_id,
        profile_img_url,
        post_history,
        join_date,
        followers,
        following,
        review_history,
    ):
        self.default_profile_img_url = (
            "Set this to a url"  # Default profile picture url
        )

        self.name = name
        self.user_id = user_id
        self.profile_img_url = profile_img_url
        self.post_history = post_history
        self.join_date = join_date
        self.followers = followers
        self.following = following
        self.review_history = review_history

    def follow(self, user_id):
        """Follows a user given a user_id."""
        self.followers.append(user_id)

    def unfollow(self, user_id):
        """Unfollows a user given a user_id. Returns 1 if successful or 0 if the user was not found."""
        if (
            user_id in self.following
        ):  # Check that user is actually following the user_id
            index = self.following.index(user_id)
            self.following.remove(index)
            return 1
        return 0

    def edit_profile_pic(self, new_url):
        """Changes the profile picture url."""
        self.profile_img_url = new_url

    def remove_profile_pic(self):
        """Removes profile picture url and changes it to the default."""
        self.profile_img_url = self.default_profile_img_url

    def remove_shared_post(self, post_id):
        """Removes a shared post given the post id. Checks that the post isn't written by the user."""
        if post_id in self.post_history:  # Check that user actually shared the post_id
            # post_author = # SQL TO OBTAIN POST INFORMATION GOES HERE
            # if post_author != self.user_id:  # Validate that the post isn't the user
            index = self.post_history.index(post_id)
            self.post_history.remove(index)
            return 1
        return 0
