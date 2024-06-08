'use client';

import {Button, Callout, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {issueSchema} from "@/app/validationSchemas";
import {z} from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(issueSchema),
    });
    const [error, setError] = useState('');

    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setError("An error occurred while creating the issue");
        }
    }

    return (
        <div className={"max-w-xl"}>
            {error && <Callout.Root color={'red'} className={"mb-5"}><Callout.Text>{error}</Callout.Text></Callout.Root>}
            <form
                className={"space-y-3"}
                onSubmit={handleSubmit((data) => onSubmit(data))}
            >
                <TextField.Root placeholder={"Title"} {...register('title')}/>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name={"description"}
                    control={control}
                    render={({field}) => <SimpleMDE placeholder={"description"} {...field}/>}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
}

export default NewIssuePage;