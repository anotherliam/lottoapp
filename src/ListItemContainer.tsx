import styled from "@emotion/native";

/**
 * List Item for both draws and results
 */

interface ListItemContainerProps { refreshing: boolean; }
const ListItemContainer = styled.View(({ refreshing }: ListItemContainerProps) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 8,
    backgroundColor: "#eee",
    elevation: 4,
    opacity: refreshing ? 0.5 : 1.0
}));

export default ListItemContainer;