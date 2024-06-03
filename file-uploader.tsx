import {UploaderIcon} from "@/assets/icons/uploader";
import {Icon} from "@iconify/react/dist/iconify";
import {Button, Card, CardBody, Image, Tooltip} from "@nextui-org/react";
import {useState} from "react";
import ImageUploading, {ErrorsType, ImageListType} from "react-images-uploading";

interface IFileUploaderProps {
  onChange: (imageList: ImageListType) => void;
  initialImages?: ImageListType;
}

function RFileUpload({onChange, initialImages = []}: IFileUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const maxNumber = 69;
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const onChangeImage = (imageList: ImageListType) => {
    setLoading(false);
    onChange(imageList);
  };

  const onError = (errors: ErrorsType, files?: ImageListType) => {
    setLoading(false);
    setErrors(errors ? (Object.values(errors).flat().filter(Boolean) as unknown as string[]) : []);
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={initialImages}
        onChange={onChangeImage}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        onError={onError}
        maxFileSize={maxFileSize}
        acceptType={["jpg", "webp", "svg", "jpeg", "pdf", "gif", "png"]}
        inputProps={{
          accept: "image/*",
        }}
        allowNonImageType={false}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div>
            {loading && <div>Loading...</div>}
            {errors.length > 0 && (
              <div>
                {errors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}
            <Card className="w-fit p-3 text-dark dark:text-light" shadow="sm">
              <CardBody
                className={`border-primary border border-dark/10 h-full rounded-lg`}
                style={isDragging ? {color: "red", borderColor: "red"} : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <div className="flex justify-center gap-3 items-center font-medium text-center">
                  <h3>Drag and drop your files or</h3>
                  <div className="flex gap-1 items-center">
                    <Button
                      size="sm"
                      type="button"
                      onClick={onImageUpload}
                      variant="flat"
                      radius="sm"
                    >
                      <UploaderIcon className="w-6 h-6" />
                      Upload
                    </Button>
                    {imageList.length > 0 && (
                      <Tooltip color="danger" content="Remove all" showArrow={true}>
                        <Button
                          size="sm"
                          color="danger"
                          radius="sm"
                          isIconOnly
                          onClick={onImageRemoveAll}
                        >
                          <Icon className="w-5 h-5" icon="solar:trash-bin-minimalistic-broken" />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </CardBody>

              <div
                className="space-y-1"
                style={imageList.length > 0 ? {marginTop: "10px"} : undefined}
              >
                {imageList.map((image, index) => (
                  <div key={index} className="border rounded-lg p-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 items-center">
                          <Image
                            radius="sm"
                            src={image.data_url}
                            alt=""
                            className="w-16 h-10 object-cover border"
                          />{" "}
                          <h3 className="font-medium text-dark dark:text-foreground">
                            {Object.entries((image as any)?.file?.name)?.length > 16
                              ? `${image?.file?.name.slice(0, 16)}...`
                              : image?.file?.name.slice(0, 16)}
                          </h3>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-dark dark:text-light">
                            {Math.round((image.file?.size || 0) / 1024) > 1024
                              ? `${Math.round((image.file?.size || 0) / (1024 * 1024))} MB`
                              : `${Math.round((image.file?.size || 0) / 1024)} KB`}
                          </div>
                          <div className="space-x-1">
                            <Tooltip content="Update" color="secondary" showArrow={true}>
                              <Button
                                variant="flat"
                                color="secondary"
                                size="sm"
                                isIconOnly
                                onClick={() => onImageUpdate(index)}
                              >
                                <Icon className="w-5 h-5" icon="solar:restart-broken" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Remove" color="danger" showArrow={true}>
                              <Button
                                variant="flat"
                                color="danger"
                                size="sm"
                                isIconOnly
                                onClick={() => onImageRemove(index)}
                              >
                                <Icon
                                  className="w-5 h-5"
                                  icon="solar:trash-bin-minimalistic-broken"
                                />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default RFileUpload;
