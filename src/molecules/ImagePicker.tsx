import { Image, Pressable, Spinner, Text } from 'native-base'

interface IImagePickerProps {
  height: number
  onPress: () => Promise<void>
  loading: boolean
  uri?: string
  placeholder: string
}

export const ImagePicker = ({
  height,
  onPress,
  uri,
  loading,
  placeholder,
}: IImagePickerProps) => {
  const getContent = () => {
    if (uri) {
      return (
        <Image
          rounded="md"
          width={height}
          height={height}
          src={uri}
          alt="random image"
        />
      )
    }
    return (
      <Text variant="button" color="tertiary.400">
        {placeholder}
      </Text>
    )
  }

  if (loading) {
    return <Spinner size="lg" />
  }

  return (
    <Pressable
      rounded="md"
      height={height}
      borderColor="trueGray.300"
      borderWidth={2}
      borderStyle="dashed"
      alignItems="center"
      justifyContent="center"
      onPress={onPress}
      isDisabled={loading}
    >
      {getContent()}
    </Pressable>
  )
}
