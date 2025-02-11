import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
interface TransferListProps<T> {
  leftItems: T[];
  rightItems: T[];
  onMoveToRight: (selectedItems: T[]) => void;
  onMoveToLeft: (selectedItems: T[]) => void;
  selectedItems: T[];
  onToggleSelection: (item: T) => void;
  onToggleAllSelection: (items: T[]) => void;
  renderItemLabel: (item: T) => string;
}

export const TransferList = <T extends { id: number }>({
  leftItems,
  rightItems,
  onMoveToRight,
  onMoveToLeft,
  selectedItems,
  onToggleSelection,
  onToggleAllSelection,
  renderItemLabel,
}: TransferListProps<T>) => {
  const numberOfChecked = (items: T[]) =>
    selectedItems.filter((item) => items.includes(item)).length;

  const renderList = (
    title: React.ReactNode,
    items: T[],
    handleToggleAll: () => void,
    isRightList: boolean
  ) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "todos los items seleccionados",
            }}
            sx={{
              color: "#5016e1",
              "&.Mui-checked": {
                color: "#5016e1",
              },
              "&.MuiCheckbox-root": {
                color: "#5016e1",
              },
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
      />
      <Divider />
      <List
        sx={{
          width: 300,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((item) => {
          const labelId = `transfer-list-all-item-${item.id}-label`;

          return (
            <ListItemButton
              key={item.id}
              role="listitem"
              onClick={() => onToggleSelection(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={selectedItems.includes(item)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  sx={{
                    color: "#5016e1",
                    "&.Mui-checked": {
                      color: "#5016e1",
                    },
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={renderItemLabel(item)} />
              {isRightList && (
                <Button
                  onClick={() => onMoveToLeft([item])}
                  disabled={leftItems.includes(item)}
                >
                  &lt;
                </Button>
              )}
              {!isRightList && (
                <Button
                  onClick={() => onMoveToRight([item])}
                  disabled={rightItems.includes(item)}
                >
                  &gt;
                </Button>
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={3}
      sx={{ justifyContent: "start", alignItems: "center" }}
    >
      <Grid item>
        {renderList(
          "Disponible",
          leftItems,
          () => onToggleAllSelection(leftItems),
          false
        )}
      </Grid>
      <Grid item>
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{
              color: "#5016e1",
              "&.Mui-checked": {
                color: "#5016e1",
              },
            }}
            variant="outlined"
            size="small"
            onClick={() => onMoveToRight(selectedItems)}
            disabled={
              selectedItems.length === 0 ||
              selectedItems.some((item) => rightItems.includes(item))
            }
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{
              color: "#5016e1",
              "&.Mui-checked": {
                color: "#5016e1",
              },
            }}
            variant="outlined"
            size="small"
            onClick={() => onMoveToLeft(selectedItems)}
            disabled={
              selectedItems.length === 0 ||
              selectedItems.some((item) => leftItems.includes(item))
            }
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {renderList(
          "Vinculado",
          rightItems,
          () => onToggleAllSelection(rightItems),
          true
        )}
      </Grid>
    </Grid>
  );
};
