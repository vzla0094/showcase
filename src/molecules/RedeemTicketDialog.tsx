import { AlertDialog, Button } from 'native-base'

interface IRedeemTicketDialogProps {
  leastDestructiveRef: React.MutableRefObject<null>
  open: boolean
  onClose: () => void
  onRedeem: () => void
}
export const RedeemTicketDialog = ({
  leastDestructiveRef,
  onClose,
  open,
  onRedeem,
}: IRedeemTicketDialogProps) => (
  <AlertDialog
    leastDestructiveRef={leastDestructiveRef}
    isOpen={open}
    onClose={onClose}
  >
    <AlertDialog.Content>
      <AlertDialog.CloseButton />
      <AlertDialog.Header>Redeem ticket?</AlertDialog.Header>
      <AlertDialog.Body>
        Are you sure you want to redeem this ticket? You can&apos;t undo this
      </AlertDialog.Body>
      <AlertDialog.Footer>
        <Button.Group space={2}>
          <Button
            onPress={onClose}
            ref={leastDestructiveRef}
            variant="unstyled"
            colorScheme="coolGray"
          >
            Cancel
          </Button>
          <Button onPress={onRedeem}>Redeem</Button>
        </Button.Group>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog>
)
