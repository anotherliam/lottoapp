import React, { useState } from "react";
import styled from "@emotion/native";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "react-native-image-picker/src";

const defaultImage = require("./images/defaultUser.png");

const Container = styled.View({
    backgroundColor: "blue",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
});

const Title = styled.Text({
    color: "white",
    fontSize: 28
});

const UserImage = styled.Image({
    width: 48,
    height: 48,
    borderRadius: 24
});

/**
 * This component displays a Title Bar + a 'profile' image that can be changed by pressing it.
 */

const UserBar: React.FC = () => {
    const [image, setImage] = useState<string | undefined>(undefined);
    const [selecting, setSelecting] = useState(false);

    const handlePressImage = () => {
        if (selecting) return;
        setSelecting(true);
        ImagePicker.launchCamera({ mediaType: "photo" }, (res) => {
            if (!res.didCancel) {
                setImage(res.uri);
            }
            setSelecting(false);
        });
    }

    const imageSource = image === undefined
        ? defaultImage
        : { uri: image };

    return (
        <Container>
            <Title>Lotto</Title>
            <TouchableOpacity onPress={handlePressImage}>
                <UserImage source={imageSource} />
            </TouchableOpacity>
        </Container>
    );
};

export default UserBar;