import { DevServerExecutorSchema } from './schema';
import { ExecutorContext, runExecutor } from '@nx/devkit';

export default async function DevServerExecutor(
  options: DevServerExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for DevServer', options);
  const { target, ...others } = options;
  const result = await runExecutor(
    {
      project: context.projectName,
      target,
    },
    {
      port: process.env.NX_WEB_PORT || 4300,
    },
    {
      ...context,
      ...others,
    }
  );
  for await (const res of result) {
    if (!res.success) return res;
  }
  return {
    success: true,
  };
}
