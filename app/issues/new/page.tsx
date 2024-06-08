'use client';

import {Button, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();

    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form
            className={"max-w-xl space-y-3"}
            onSubmit={handleSubmit((data) => onSubmit(data))}
        >
            <TextField.Root placeholder={"Title"} {...register('title')}/>
            <Controller
                name={"description"}
                control={control}
                render={({field}) => <SimpleMDE placeholder={"description"} {...field}/>}
            />
            <Button>Submit New Issue</Button>
        </form>

    );
}

export default NewIssuePage;